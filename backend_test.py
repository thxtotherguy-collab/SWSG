#!/usr/bin/env python3
"""
Backend API Testing for SWSG Rebrand Verification
Tests all backend endpoints and verifies the new enquiry_type field in consultations
"""

import requests
import json
from pymongo import MongoClient
import sys

# Backend URL
BASE_URL = "http://localhost:8001/api"

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "swsg_db"

# Test results tracking
test_results = []

def log_test(test_name, passed, message=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    result = f"{status} - {test_name}"
    if message:
        result += f": {message}"
    print(result)
    test_results.append({"test": test_name, "passed": passed, "message": message})
    return passed

def test_health():
    """Test GET /api/health"""
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "status" in data and data["status"] == "healthy":
                return log_test("GET /api/health", True, "Backend is healthy")
            else:
                return log_test("GET /api/health", False, f"Unexpected response: {data}")
        else:
            return log_test("GET /api/health", False, f"Status code: {response.status_code}")
    except Exception as e:
        return log_test("GET /api/health", False, f"Exception: {str(e)}")

def test_products():
    """Test GET /api/products - should return 19 products after seed"""
    try:
        response = requests.get(f"{BASE_URL}/products", timeout=5)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                count = len(products)
                if count == 19:
                    return log_test("GET /api/products", True, f"Returned {count} products as expected")
                else:
                    return log_test("GET /api/products", False, f"Expected 19 products, got {count}")
            else:
                return log_test("GET /api/products", False, "Response is not a list")
        else:
            return log_test("GET /api/products", False, f"Status code: {response.status_code}")
    except Exception as e:
        return log_test("GET /api/products", False, f"Exception: {str(e)}")

def test_products_featured():
    """Test GET /api/products?featured=true&limit=8"""
    try:
        response = requests.get(f"{BASE_URL}/products?featured=true&limit=8", timeout=5)
        if response.status_code == 200:
            products = response.json()
            if isinstance(products, list):
                count = len(products)
                if count <= 8:
                    # Verify all are featured
                    all_featured = all(p.get("featured", False) for p in products)
                    if all_featured:
                        return log_test("GET /api/products?featured=true&limit=8", True, f"Returned {count} featured products")
                    else:
                        return log_test("GET /api/products?featured=true&limit=8", False, "Some products are not featured")
                else:
                    return log_test("GET /api/products?featured=true&limit=8", False, f"Expected max 8 products, got {count}")
            else:
                return log_test("GET /api/products?featured=true&limit=8", False, "Response is not a list")
        else:
            return log_test("GET /api/products?featured=true&limit=8", False, f"Status code: {response.status_code}")
    except Exception as e:
        return log_test("GET /api/products?featured=true&limit=8", False, f"Exception: {str(e)}")

def test_categories():
    """Test GET /api/categories"""
    try:
        response = requests.get(f"{BASE_URL}/categories", timeout=5)
        if response.status_code == 200:
            categories = response.json()
            if isinstance(categories, list) and len(categories) > 0:
                return log_test("GET /api/categories", True, f"Returned {len(categories)} categories")
            else:
                return log_test("GET /api/categories", False, "No categories returned")
        else:
            return log_test("GET /api/categories", False, f"Status code: {response.status_code}")
    except Exception as e:
        return log_test("GET /api/categories", False, f"Exception: {str(e)}")

def test_consultation_with_enquiry_type():
    """Test POST /api/consultations with enquiry_type field"""
    try:
        payload = {
            "full_name": "John Smith",
            "phone": "+27 81 123 4567",
            "email": "john.smith@example.com",
            "enquiry_type": "irrigation",
            "application_type": "agricultural",
            "description": "Testing new enquiry_type field for SWSG rebrand verification."
        }
        response = requests.post(f"{BASE_URL}/consultations", json=payload, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "status" in data and data["status"] == "pending":
                consultation_id = data["id"]
                # Verify in MongoDB that enquiry_type was saved
                try:
                    client = MongoClient(MONGO_URL)
                    db = client[DB_NAME]
                    doc = db.consultations.find_one({"id": consultation_id})
                    if doc and "enquiry_type" in doc and doc["enquiry_type"] == "irrigation":
                        return log_test("POST /api/consultations (with enquiry_type)", True, f"Created consultation {consultation_id} with enquiry_type='irrigation'")
                    else:
                        return log_test("POST /api/consultations (with enquiry_type)", False, "enquiry_type not found in MongoDB document")
                except Exception as db_error:
                    return log_test("POST /api/consultations (with enquiry_type)", False, f"MongoDB verification failed: {str(db_error)}")
            else:
                return log_test("POST /api/consultations (with enquiry_type)", False, f"Unexpected response: {data}")
        else:
            return log_test("POST /api/consultations (with enquiry_type)", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        return log_test("POST /api/consultations (with enquiry_type)", False, f"Exception: {str(e)}")

def test_consultation_without_enquiry_type():
    """Test POST /api/consultations without enquiry_type (backwards compatibility)"""
    try:
        payload = {
            "full_name": "Jane Doe",
            "phone": "+27 81 987 6543",
            "email": "jane.doe@example.com",
            "application_type": "residential",
            "description": "Testing backwards compatibility without enquiry_type field."
        }
        response = requests.post(f"{BASE_URL}/consultations", json=payload, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "status" in data and data["status"] == "pending":
                return log_test("POST /api/consultations (without enquiry_type)", True, f"Created consultation {data['id']} - backwards compatible")
            else:
                return log_test("POST /api/consultations (without enquiry_type)", False, f"Unexpected response: {data}")
        else:
            return log_test("POST /api/consultations (without enquiry_type)", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        return log_test("POST /api/consultations (without enquiry_type)", False, f"Exception: {str(e)}")

def test_quotes():
    """Test POST /api/quotes with items"""
    try:
        payload = {
            "name": "Michael Brown",
            "email": "michael.brown@example.com",
            "phone": "+27 81 555 1234",
            "company": "Brown Irrigation Ltd",
            "message": "Please provide a quote for these items",
            "items": [
                {"name": "DAB E.SYBOX Mini 3", "qty": 2, "price": 12500.00},
                {"name": "JoJo 2500L Vertical Tank", "qty": 1, "price": 4200.00}
            ]
        }
        response = requests.post(f"{BASE_URL}/quotes", json=payload, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "id" in data and "status" in data and data["status"] == "pending":
                # Note: Email sending may fail if RESEND_API_KEY is not configured, but endpoint should still succeed
                return log_test("POST /api/quotes", True, f"Created quote {data['id']} (email may not be sent if RESEND_API_KEY not configured)")
            else:
                return log_test("POST /api/quotes", False, f"Unexpected response: {data}")
        else:
            return log_test("POST /api/quotes", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        return log_test("POST /api/quotes", False, f"Exception: {str(e)}")

def test_auth_register():
    """Test POST /api/auth/register"""
    try:
        # Generate unique email for this test
        import time
        email = f"testuser_{int(time.time())}@example.com"
        payload = {
            "name": "Test User",
            "email": email,
            "password": "SecurePassword123!",
            "phone": "+27 81 999 8888"
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=payload, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "token" in data and "user" in data:
                return log_test("POST /api/auth/register", True, f"Registered user {email} successfully")
            else:
                return log_test("POST /api/auth/register", False, f"Unexpected response: {data}")
        else:
            return log_test("POST /api/auth/register", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        return log_test("POST /api/auth/register", False, f"Exception: {str(e)}")

def test_auth_login():
    """Test POST /api/auth/login"""
    try:
        # First register a user
        import time
        email = f"logintest_{int(time.time())}@example.com"
        password = "LoginPassword123!"
        
        # Register
        register_payload = {
            "name": "Login Test User",
            "email": email,
            "password": password,
            "phone": "+27 81 777 6666"
        }
        register_response = requests.post(f"{BASE_URL}/auth/register", json=register_payload, timeout=5)
        if register_response.status_code != 200:
            return log_test("POST /api/auth/login", False, "Failed to register test user for login test")
        
        # Now login
        login_payload = {
            "email": email,
            "password": password
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=login_payload, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if "token" in data and "user" in data:
                return log_test("POST /api/auth/login", True, f"Logged in user {email} successfully")
            else:
                return log_test("POST /api/auth/login", False, f"Unexpected response: {data}")
        else:
            return log_test("POST /api/auth/login", False, f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        return log_test("POST /api/auth/login", False, f"Exception: {str(e)}")

def verify_email_template_rebrand():
    """Verify that the email template has been rebranded to SWSG"""
    try:
        # Check the server.py file for rebrand elements
        with open("/app/backend/server.py", "r") as f:
            content = f.read()
            
        checks = [
            ("Southern Water Solutions Group" in content, "Company name 'Southern Water Solutions Group' found"),
            ("#1E63A8" in content, "New brand color #1E63A8 found"),
            ("info@swsg.co.za" in content, "Email info@swsg.co.za found"),
            ("+27 81 417 7689" in content, "Phone +27 81 417 7689 found"),
            ("Quote Request Received - Southern Water Solutions Group" in content, "Email subject updated")
        ]
        
        all_passed = all(check[0] for check in checks)
        details = ", ".join([check[1] for check in checks if check[0]])
        
        if all_passed:
            return log_test("Email Template Rebrand Verification", True, details)
        else:
            failed = ", ".join([check[1] for check in checks if not check[0]])
            return log_test("Email Template Rebrand Verification", False, f"Missing: {failed}")
    except Exception as e:
        return log_test("Email Template Rebrand Verification", False, f"Exception: {str(e)}")

def main():
    """Run all backend tests"""
    print("=" * 80)
    print("SWSG Backend Rebrand Verification Tests")
    print("=" * 80)
    print()
    
    # Run all tests
    test_health()
    test_products()
    test_products_featured()
    test_categories()
    test_consultation_with_enquiry_type()
    test_consultation_without_enquiry_type()
    test_quotes()
    test_auth_register()
    test_auth_login()
    verify_email_template_rebrand()
    
    print()
    print("=" * 80)
    print("Test Summary")
    print("=" * 80)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = sum(1 for r in test_results if not r["passed"])
    total = len(test_results)
    
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print()
    
    if failed > 0:
        print("Failed Tests:")
        for r in test_results:
            if not r["passed"]:
                print(f"  - {r['test']}: {r['message']}")
        sys.exit(1)
    else:
        print("✅ All tests passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()
