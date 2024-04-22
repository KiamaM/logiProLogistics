import mssql from 'mssql'
import { sqlConfig } from '../Config/sqlConfig'
import path from 'path'
import ejs from 'ejs'
import { sendMail } from '../Helpers/email.helper'




export const welcomeUser = async()=>{
    const pool = mssql.connect(sqlConfig)

    const users = (await((await pool).request().query('SELECT * FROM users WHERE isDeleted = 0 AND isWelcomed=0'))).recordset

    console.log(users);

    for(let user of users){
        const templatePath = path.resolve(__dirname, '../Templates/welcomeUser.ejs');

        console.log('Template Path:', templatePath);

        ejs.renderFile('Templates/welcomeUser.ejs', {userName:user.firstName}, async(error, data:any)=>{
            if(error){
                console.error('Error rendering ejs template', error);
                return                                
            }

            console.log('Rendered template data', data);


            let mailOptions = {
                from: "muriithikiamad1@gmail.com",
                to: user.email,
                subject: "Welcome to LogiPro",
                html: data
            }
            console.log(data);

            try {
                await sendMail(mailOptions);

                (await pool).request().query('UPDATE users SET isWelcomed=1 WHERE isWelcomed=0 AND isDeleted= 0')

                console.log('Email sent to new user');
                
                
            } catch (error) {
                console.error(error);
                
            }
            
        })

    }
    
}

