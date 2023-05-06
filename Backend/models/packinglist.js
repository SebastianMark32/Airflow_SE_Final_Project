/**
 * This models the functions and data format to be
 * used by the packinglist controller and route files
 * @author Zach East
 */
const db = require('../util/database');

//Export all functions of this class 
module.exports = class Packinglist {

    //Constructor for object
    constructor(user, tripname, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, checked1, checked2, checked3, checked4, checked5, checked6, checked7, checked8, checked9, checked10) {
        this.user = user;
        this.description = description;
        this.tripname = tripname;

        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
        this.item4 = item4;
        this.item5 = item5;
        this.item6 = item6;
        this.item7 = item7;
        this.item8 = item8;
        this.item9 = item9;
        this.item10 = item10;

        this.checked1 = checked1;
        this.checked2 = checked2;
        this.checked3 = checked3;
        this.checked4 = checked4;
        this.checked5 = checked5;
        this.checked6 = checked6;
        this.checked7 = checked7;
        this.checked8 = checked8;
        this.checked9 = checked9;
        this.checked10 = checked10;
        
    }

    //Function to pass pull specific entries in database by user
    static fetchAll(user)
    {
        return db.execute(
            `SELECT * FROM Airflow.packinglists WHERE user = ${user}`
        );
    }

    //Function to insert new entry into database using values from passed objects
    static save(post){
        console.log(post);
        return db.execute(
            'INSERT INTO Airflow.packinglists (user, tripname) VALUES (?,?)',
            [post.user, post.tripname]
        );
    }


}