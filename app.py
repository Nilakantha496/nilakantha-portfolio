from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
# Use a local SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    tech_stack = db.Column(db.String(200), nullable=False) # Comma-separated string
    link = db.Column(db.String(200), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'tech_stack': [tech.strip() for tech in self.tech_stack.split(',')],
            'link': self.link
        }

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    proficiency = db.Column(db.Integer, nullable=False) # 1-100
    category = db.Column(db.String(50), nullable=False) # Frontend, Backend, Tools

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'proficiency': self.proficiency,
            'category': self.category
        }

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])

@app.route('/api/skills')
def get_skills():
    skills = Skill.query.all()
    return jsonify([s.to_dict() for s in skills])

if __name__ == '__main__':
    # We will initialize the db in a separate seed script
    app.run(debug=True, port=5000)
