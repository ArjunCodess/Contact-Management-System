from app import app, db
from flask import request, jsonify
from models import Contact

# get all contacts
@app.route('/api/contacts', methods=["GET"])

def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts] # [{...}, {...}, {...}]
    return jsonify(result)

# create a contact
@app.route('/api/contacts', methods=["POST"])

def create_contact():
    try:
        data = request.json

        required_fields = ["name", "role", "description", "gender", "phone"]

        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({ "error": f"Missing required field: {field}" }), 400

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        phone = data.get("phone")
        name = data.get("name")
        first_name = name.split()[0]

        # fetch avatar image based on gender and name
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={first_name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={first_name}"
        else:
            img_url = None

        new_contact = Contact(name = name, role = role, description = description, phone = phone, gender = gender, img_url = img_url)

        db.session.add(new_contact)
        db.session.commit()

        # return jsonify({ "msg": "New contact created successfully!" }), 201

        return jsonify(new_contact.to_json()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({ "error": str(e) }), 500
    
# delete a contact
@app.route('/api/contacts/<int:id>', methods=["DELETE"])

def delete_contact(id):
    try:
        contact = Contact.query.get(id)

        if contact is None:
            return jsonify({ "error": "Contact not found" }), 404
        
        db.session.delete(contact)
        db.session.commit()

        return jsonify({ "msg": f"Contact with id = {id} deleted successfully!" }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({ "error": str(e) }), 500
    
# update a contact
@app.route('/api/contacts/<int:id>', methods=["PATCH"])

def update_contact(id):
    try:
        contact = Contact.query.get(id)

        if contact is None:
            return jsonify({ "error": "Contact not found" }), 404
        
        data = request.json

        contact.name = data.get("name", contact.name)
        contact.role = data.get("role", contact.role)
        contact.description = data.get("description", contact.description)
        contact.phone = data.get("phone", contact.phone)
        contact.gender = data.get("gender", contact.gender)
        
        db.session.commit()

        # return jsonify({ "msg": f"Contact with id = {id} updated successfully!" }), 201
        
        return jsonify(contact.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({ "error": str(e) }), 500