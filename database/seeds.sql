-- =========================================================
-- SEED DATA
-- =========================================================

-- =========================================================
-- FACILITIES
-- =========================================================

INSERT INTO facility
    (name, type, erp_capacity, address, is_divisible)
VALUES
    ('Complexe Sportif Municipal', 'Complexe sportif', 500, 'Avenue Mohammed VI, Marrakech', FALSE),
    ('Gymnase Al Amal', 'Gymnase', 120, 'Quartier Sidi Youssef, Marrakech', TRUE),
    ('Piscine Municipale', 'Piscine', 80, 'Route de Casablanca, Marrakech', FALSE),
    ('Stade Annexe', 'Stade', 300, 'Route de Safi, Marrakech', TRUE),
    ('Salle Polyvalente', 'Salle', 60, 'Ait Ourir, Marrakech-Safi', TRUE);


-- =========================================================
-- CLUBS
-- =========================================================

INSERT INTO club
    (name, description, contact)
VALUES
    (
        'Marrakech Football Club',
        'Club de football pour enfants, jeunes et adultes.',
        'contact@marrakechfc.ma'
    ),
    (
        'Atlas Basketball Club',
        'Club spécialisé dans la pratique du basketball.',
        'contact@atlasbasket.ma'
    ),
    (
        'Marrakech Natation',
        'Club de natation et activités aquatiques.',
        'contact@marrakechnatation.ma'
    ),
    (
        'Atlas Rugby Club',
        'Club de rugby pour jeunes et adultes.',
        'contact@atlasrugby.ma'
    ),
    (
        'Marrakech Boxing Club',
        'Club de boxe et préparation physique.',
        'contact@marrakechboxing.ma'
    );


-- =========================================================
-- FAMILIES
-- =========================================================

INSERT INTO family
    (name, quotient_familial)
VALUES
    ('Famille Alaoui', 450.00),
    ('Famille Amrani', 720.00),
    ('Famille Benali', 1050.00),
    ('Famille Idrissi', 580.00),
    ('Famille El Mansouri', 850.00),
    ('Famille Tazi', NULL);


-- =========================================================
-- ACTIVITIES
-- =========================================================

INSERT INTO activity
    (
        name,
        description,
        base_price,
        max_capacity,
        age_category,
        day_of_week,
        start_time,
        end_time,
        medical_validity_years,
        facility_id,
        club_id
    )
VALUES
    (
        'Football U15',
        'Entraînement de football pour les jeunes de 13 à 14 ans.',
        300.00,
        30,
        '15',
        'Mercredi',
        '14:00',
        '16:00',
        3,
        1,
        1
    ),

    (
        'Football Senior',
        'Entraînement de football pour adultes.',
        400.00,
        40,
        '18',
        'Lundi',
        '18:00',
        '20:00',
        3,
        1,
        1
    ),

    (
        'Basketball U13',
        'Entraînement de basketball pour les jeunes de 11 à 12 ans.',
        250.00,
        20,
        '13',
        'Mardi',
        '16:00',
        '18:00',
        3,
        2,
        2
    ),

    (
        'Natation Tous Publics',
        'Cours de natation ouverts à tous les publics.',
        350.00,
        25,
        'Tous publics',
        'Samedi',
        '10:00',
        '12:00',
        3,
        3,
        3
    ),

    (
        'Rugby U18',
        'Entraînement de rugby pour les jeunes de 15 à 17 ans.',
        320.00,
        25,
        '18',
        'Jeudi',
        '17:00',
        '19:00',
        1,
        4,
        4
    ),

    (
        'Boxe Senior',
        'Entraînement de boxe pour adultes.',
        450.00,
        15,
        '18',
        'Vendredi',
        '18:00',
        '20:00',
        1,
        5,
        5
    );


-- =========================================================
-- MEMBERS
-- =========================================================

INSERT INTO member
    (
        first_name,
        last_name,
        birth_date,
        address,
        is_resident,
        medical_status,
        family_id
    )
VALUES
    (
        'Yassine',
        'Alaoui',
        '2012-05-14',
        'Marrakech',
        TRUE,
        'compliant',
        1
    ),

    (
        'Sara',
        'Alaoui',
        '2010-08-21',
        'Marrakech',
        TRUE,
        'compliant',
        1
    ),

    (
        'Omar',
        'Amrani',
        '2008-03-10',
        'Marrakech',
        TRUE,
        'compliant',
        2
    ),

    (
        'Aya',
        'Amrani',
        '2015-11-02',
        'Marrakech',
        TRUE,
        'compliant',
        2
    ),

    (
        'Adam',
        'Benali',
        '2005-07-18',
        'Casablanca',
        FALSE,
        'compliant',
        3
    ),

    (
        'Salma',
        'Idrissi',
        '2011-02-25',
        'Marrakech',
        TRUE,
        'medical_non_compliant',
        4
    ),

    (
        'Mehdi',
        'El Mansouri',
        '1995-06-12',
        'Marrakech',
        TRUE,
        'compliant',
        5
    ),

    (
        'Imane',
        'Tazi',
        '1980-09-30',
        'Marrakech',
        FALSE,
        'compliant',
        6
    );


-- =========================================================
-- REGISTRATIONS
-- =========================================================

INSERT INTO registration
    (
        final_price,
        status,
        registration_date,
        payment_option,
        season,
        member_id,
        activity_id
    )
VALUES
    (
        180.00,
        'confirmed',
        CURRENT_DATE,
        '1x',
        '2026-2027',
        1,
        1
    ),

    (
        340.00,
        'confirmed',
        CURRENT_DATE,
        '3x',
        '2026-2027',
        2,
        2
    ),

    (
        200.00,
        'confirmed',
        CURRENT_DATE,
        '1x',
        '2026-2027',
        3,
        3
    ),

    (
        210.00,
        'confirmed',
        CURRENT_DATE,
        '3x',
        '2026-2027',
        4,
        3
    ),

    (
        400.00,
        'confirmed',
        CURRENT_DATE,
        '1x',
        '2026-2027',
        5,
        2
    );


-- =========================================================
-- WAITING LIST
-- =========================================================

INSERT INTO waiting_list
    (
        priority_score,
        status,
        deadline_confirmation,
        created_at,
        member_id,
        activity_id
    )
VALUES
    (
        10,
        'waiting',
        NULL,
        CURRENT_TIMESTAMP - INTERVAL '2 days',
        6,
        1
    ),

    (
        0,
        'waiting',
        NULL,
        CURRENT_TIMESTAMP - INTERVAL '1 day',
        7,
        1
    ),

    (
        10,
        'promoted_pending',
        CURRENT_TIMESTAMP + INTERVAL '36 hours',
        CURRENT_TIMESTAMP - INTERVAL '12 hours',
        8,
        3
    );