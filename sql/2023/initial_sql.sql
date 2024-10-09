CREATE EXTENSION IF NOT EXISTS citext;

create sequence staff_id_seq increment by 1 start with 1;

CREATE TABLE  staff (
    id integer DEFAULT nextval('staff_id_seq'::regclass) NOT NULL,
       name varchar(255) NOT NULL,
       email citext NOT NULL,
       password varchar(255) NOT NULL,
       secret_key varchar(255) NOT NULL,
       contact_number varchar(255) NOT NULL,
       last_login_timestamp timestamp(0) DEFAULT NULL,
       status boolean NOT NULL DEFAULT TRUE,
       role_type varchar(255) NOT NULL,
       timezone_id smallint NOT NULL DEFAULT 33,
       deleted_at timestamp(0) DEFAULT NULL,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);

ALTER TABLE staff ADD COLUMN company_id SMALLINT NOT NULL DEFAULT 0;
ALTER TABLE staff ADD COLUMN company_name varchar(255) DEFAULT '';
ALTER TABLE staff ADD COLUMN product_scope jsonb NOT NULL DEFAULT '[]';



create sequence company_id_seq increment by 1 start with 1;

CREATE TABLE  company (
    id integer DEFAULT nextval('company_id_seq'::regclass) NOT NULL,
       name varchar(255) NOT NULL,
       status boolean NOT NULL DEFAULT TRUE,
       deleted_at timestamp(0) DEFAULT NULL,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);

    ALTER TABLE company ADD COLUMN contact_number varchar(255) NOT NULL;
    ALTER TABLE company ADD COLUMN email citext NOT NULL;


create sequence attributes_id_seq increment by 1 start with 1;

CREATE TABLE  attributes (
    id integer DEFAULT nextval('attributes_id_seq'::regclass) NOT NULL,
    company_id INT NOT NULL DEFAULT 0,
    name varchar(255) NOT NULL,
    name_to_show varchar(255) NOT NULL,
    label varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (id);

ALTER TABLE attributes ADD column select_option jsonb NOT NULL DEFAULT '[]';

create sequence attributes_group_id_seq increment by 1 start with 1;

CREATE TABLE  attributes_group (
    id integer DEFAULT nextval('attributes_group_id_seq'::regclass) NOT NULL,
    company_id INT NOT NULL DEFAULT 0,
    label varchar(255) NOT NULL,
    label_to_show varchar(255) NOT NULL,
    attributes jsonb NOT NULL DEFAULT '[]',
    created_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) without time zone NOT NULL
);

ALTER TABLE ONLY public.attributes_group
    ADD CONSTRAINT attributes_group_pkey PRIMARY KEY (id);

ALTER TABLE staff ADD column product_list_attributes jsonb NOT NULL DEFAULT '[]';
ALTER TABLE staff ADD column default_view_name varchar(255) NOT NULL DEFAULT '';

ALTER TABLE company ADD column facebook_token varchar(255) NOT NULL DEFAULT '';
ALTER TABLE company ADD column google_token varchar(255) NOT NULL DEFAULT '';
