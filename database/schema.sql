CREATE TABLE facility (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(100) NOT NULL,
    erp_capacity INTEGER NOT NULL CHECK (erp_capacity > 0),
    address VARCHAR(255) NOT NULL,
    is_divisible BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE club (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    contact VARCHAR(150),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    quotient_familial NUMERIC(10, 2) CHECK (
        quotient_familial IS NULL
        OR quotient_familial >= 0
    ),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    max_capacity INTEGER NOT NULL CHECK (max_capacity > 0),
    age_category VARCHAR(50) NOT NULL DEFAULT 'Tous publics',
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    -- Medical certificate validity in years
    medical_validity_years INTEGER NOT NULL DEFAULT 1,

    facility_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,

    CONSTRAINT chk_activity_time
        CHECK (start_time < end_time),

    CONSTRAINT chk_activity_day
        CHECK (
            day_of_week IN (
                'Lundi',
                'Mardi',
                'Mercredi',
                'Jeudi',
                'Vendredi',
                'Samedi',
                'Dimanche'
            )
        ),

    CONSTRAINT chk_activity_age_category
        CHECK (
            age_category IN (
                '9',
                '11',
                '13',
                '15',
                '18',
                'Tous publics'
            )
        ),

    CONSTRAINT chk_medical_validity
        CHECK (medical_validity_years IN (1, 3)),

    CONSTRAINT fk_activity_facility
        FOREIGN KEY (facility_id)
        REFERENCES facility (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activity_club
        FOREIGN KEY (club_id)
        REFERENCES club (id)
        ON DELETE CASCADE
);

CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(255),

    -- Used for municipal resident pricing
    -- and waiting-list priority
    is_resident BOOLEAN NOT NULL DEFAULT TRUE,

    -- Medical information
    medical_status VARCHAR(50) NOT NULL DEFAULT 'compliant',
    medical_certificate_date DATE,

    -- Pass'Sport
    pass_sport_code VARCHAR(100),
    pass_sport_valid_until DATE,

    family_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_medical_status
        CHECK (
            medical_status IN (
                'compliant',
                'medical_non_compliant'
            )
        ),

    CONSTRAINT fk_member_family
        FOREIGN KEY (family_id)
        REFERENCES family (id)
        ON DELETE CASCADE
);

CREATE TABLE registration (
    id SERIAL PRIMARY KEY,
    final_price NUMERIC(10, 2) NOT NULL CHECK (final_price >= 15.00),
    status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_option VARCHAR(20) NOT NULL DEFAULT '1x',

    -- Important for family discount calculation
    season VARCHAR(9) NOT NULL,

    member_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,

    CONSTRAINT chk_registration_status
        CHECK (
            status IN (
                'confirmed',
                'cancelled'
            )
        ),

    CONSTRAINT chk_payment_option
        CHECK (
            payment_option IN ('1x', '3x')
        ),

    CONSTRAINT fk_registration_member
        FOREIGN KEY (member_id)
        REFERENCES member (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_registration_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (id)
        ON DELETE CASCADE,

    -- Prevent the same member from registering twice
    -- for the same activity in the same season
    CONSTRAINT unique_member_activity_season
        UNIQUE (member_id, activity_id, season)
);

CREATE TABLE waiting_list (
    id SERIAL PRIMARY KEY,
    priority_score INTEGER NOT NULL CHECK (priority_score >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'waiting',
    deadline_confirmation TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    member_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,

    CONSTRAINT chk_waiting_status
        CHECK (
            status IN (
                'waiting',
                'promoted_pending',
                'expired',
                'confirmed',
                'cancelled'
            )
        ),

    CONSTRAINT fk_waiting_member
        FOREIGN KEY (member_id)
        REFERENCES member (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_waiting_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity (id)
        ON DELETE CASCADE
);

-- =========================================================
-- INDEXES
-- =========================================================

-- Activity searches
CREATE INDEX idx_activity_facility
    ON activity (facility_id);

CREATE INDEX idx_activity_club
    ON activity (club_id);

CREATE INDEX idx_activity_day
    ON activity (day_of_week);

-- Member / family
CREATE INDEX idx_member_family
    ON member (family_id);

CREATE INDEX idx_registration_activity_status
    ON registration (activity_id, status);

CREATE INDEX idx_registration_member
    ON registration (member_id);

CREATE INDEX idx_registration_season
    ON registration (season);

-- Waiting list
CREATE INDEX idx_waiting_activity_status
    ON waiting_list (activity_id, status);

CREATE INDEX idx_waiting_priority
    ON waiting_list (
        activity_id,
        priority_score DESC,
        created_at ASC
    );