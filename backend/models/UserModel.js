import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

export const Users = db.define(
    "users",
    {
        full_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
    }
);

export const Doctors = db.define(
    "doctors",
    {
        full_name: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
        },
        iin: {
            type: DataTypes.BIGINT,
            validate: {
                len: [12],
            },
        },
        contact_number: {
            type: DataTypes.STRING,
        },
        dep_id: {
            type: DataTypes.INTEGER,
        },
        spec_id: {
            type: DataTypes.INTEGER,
        },
        exp: {
            type: DataTypes.INTEGER,
        },
        img: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        degree: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

export const Patients = db.define(
    "patients",
    {
        full_name: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
        },
        iin: {
            type: DataTypes.BIGINT,
            validate: {
                len: [12],
            },
        },
        contact_number: {
            type: DataTypes.STRING,
        },
        emer_contact_number: {
            type: DataTypes.STRING,
        },
        blood_group: {
            type: DataTypes.STRING,
        },
        marital_status: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

export const DoctorSchedule = db.define(
    "doctorSchedule",
    {
        doc_id: {
            type: DataTypes.INTEGER,
        },
        first: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        second: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        third: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        fourth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        fivth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sixth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        seventh: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        eighth: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
    }
);

(async () => {
    await db.sync();
})();
