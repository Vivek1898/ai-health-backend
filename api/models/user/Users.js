/**
 * Users.js
 * A model for storing all user information
 * Table Name   :   users
 * Database     :   postgres
 */

module.exports = {
    tableName: 'users',
    attributes: {
        name: {
            type: 'string',
            required: true,
            columnName: 'name',
            columnType: 'varchar(255) NOT NULL'
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            columnName: 'email',
            columnType: 'citext NOT NULL'
        },
        password: {
            type: 'string',
            required: true,
            columnName: 'password',
            columnType: 'varchar(255) NOT NULL'
        },
        dateOfBirth: {
            type: 'ref',
            required: false,
            columnName: 'date_of_birth',
            columnType: 'string'
        },
        gender: {
            type: 'string',
            required: false,
            columnName: 'gender',
            columnType: 'varchar(10)',
            isIn: ['Male', 'Female', 'Other']
        },
        phoneNumber: {
            type: 'string',
            required: false,
            columnName: 'phone_number',
            columnType: 'varchar(15)'
        },
        healthScore: {
            type: 'number',
            required: false,
            columnName: 'health_score',
            columnType: 'integer'
        },
        createdAt: {
            type: 'ref',
            required: false,
            autoCreatedAt: true,
            columnName: 'created_at',
            columnType: 'timestamp(0) without time zone NOT NULL'
        },
        updatedAt: {
            type: 'ref',
            required: false,
            autoUpdatedAt: true,
            columnName: 'updated_at',
            columnType: 'timestamp(0) without time zone NOT NULL'
        }
    }
};
