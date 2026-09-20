

CREATE TABLE facility (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(100) NOT NULL,
    erp_capacity INTEGER NOT NULL,
    address VARCHAR(255) NOT NULL
);


-- ============================================
-- CLUB
-- ============================================

CREATE TABLE club (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    contact VARCHAR(150)
);



CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    quotient_familial DECIMAL(10,2)
);




CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    max_capacity INTEGER NOT NULL,
    age_category VARCHAR(100),
    day_of_week VARCHAR(20),
    start_time TIME,
    end_time TIME,

    facility_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,

    CONSTRAINT fk_activity_facility
        FOREIGN KEY (facility_id)
        REFERENCES facility(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activity_club
        FOREIGN KEY (club_id)
        REFERENCES club(id)
        ON DELETE CASCADE
);


CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    medical_status VARCHAR(100),
    address VARCHAR(255),

    family_id INTEGER NOT NULL,

    CONSTRAINT fk_member_family
        FOREIGN KEY (family_id)
        REFERENCES family(id)
        ON DELETE CASCADE
);




CREATE TABLE registration (
    id SERIAL PRIMARY KEY,
    final_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_option VARCHAR(50),

    member_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,

    CONSTRAINT fk_registration_member
        FOREIGN KEY (member_id)
        REFERENCES member(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_registration_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity(id)
        ON DELETE CASCADE
);





CREATE TABLE waiting_list (
    id SERIAL PRIMARY KEY,
    priority_score INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    deadline_confirmation TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    member_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,

    CONSTRAINT fk_waiting_member
        FOREIGN KEY (member_id)
        REFERENCES member(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_waiting_activity
        FOREIGN KEY (activity_id)
        REFERENCES activity(id)
        ON DELETE CASCADE
);