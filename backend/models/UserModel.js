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

export const DoctorSchedule = db.define("doctor_schedule", {
    doc_id: {
        type: DataTypes.INTEGER,
    },
    first: {
        type: DataTypes.BOOLEAN,
    },
    second: {
        type: DataTypes.BOOLEAN,
    },
    third: {
        type: DataTypes.BOOLEAN,
    },
    fivth: {
        type: DataTypes.BOOLEAN,
    },
    sixth: {
        type: DataTypes.BOOLEAN,
    },
    seventh: {
        type: DataTypes.BOOLEAN,
    },
    eighth: {
        type: DataTypes.BOOLEAN,
    },
    ninth: {
        type: DataTypes.BOOLEAN,
    },
});

(async () => {
    await db.sync();
})();
