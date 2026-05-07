from app import app, db, Project, Skill

def seed_data():
    with app.app_context():
        # Drop and recreate tables
        db.drop_all()
        db.create_all()

        print("Tables created. Seeding data...")

        # Create Skills
        skills = [
            Skill(name='Python & Java', proficiency=90, category='Backend'),
            Skill(name='Next.js & React', proficiency=85, category='Frontend'),
            Skill(name='Node.js & SQL', proficiency=80, category='Backend'),
            Skill(name='Cybersecurity', proficiency=75, category='Tools'),
            Skill(name='Graphic Design', proficiency=85, category='Tools'),
            Skill(name='Linux / Kali Linux', proficiency=80, category='Tools'),
            Skill(name='AWS & Networking', proficiency=70, category='Backend')
        ]

        # Create Projects
        projects = [
            Project(
                title='CLAMOR Assistant',
                description='CLAMOR is a Python-based voice-controlled AI assistant designed to empower physically disabled users by enabling hands-free interaction with computers. It leverages speech recognition, natural language command parsing, and task automation to perform everyday system and web operations through simple voice commands.',
                image_url='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
                tech_stack='Python',
                link='https://github.com/Nilakantha496/clamor-assistant'
            ),
            Project(
                title='Car Rental System',
                description='A Car Rental System designed to automate vehicle booking, customer management, and rental operations. Includes user authentication, car availability tracking, booking history, and admin controls for efficient fleet management.',
                image_url='https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
                tech_stack='Java',
                link='https://github.com/Nilakantha496/car_rental_system'
            ),
            Project(
                title='Phone Recommendation Chatbot',
                description='The chatbot adapts to different user profiles, whether someone wants an affordable everyday phone, a high-performance gaming device, a long-lasting battery phone, or a camera-focused flagship model. Responses are fast, personalized, and unbiased, helping users save time.',
                image_url='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
                tech_stack='Python',
                link='https://github.com/Nilakantha496/phone_recommendation_chatbot'
            ),
            Project(
                title='Phone World',
                description='A modern web application or project related to mobile phones, built using TypeScript.',
                image_url='https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=600',
                tech_stack='TypeScript',
                link='https://github.com/Nilakantha496/phone-world'
            )
        ]

        db.session.add_all(skills)
        db.session.add_all(projects)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
