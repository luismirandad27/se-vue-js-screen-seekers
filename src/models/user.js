export default class User{
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    setFirstName(firstName){
        this.firstName = firstName;
    }

    setLastName(lastName){
        this.lastName = lastName;
    }

    setDateOfBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth;
    }

    setPhone(phone){
        this.phone = phone;
    }

    setAddress(address){
        this.address = address;
    }

    setCity(city){
        this.city = city;
    }

    setProvince(province){
        this.province = province;
    }

    setCountry(country){
        this.country = country;
    }

    setProfileImage(profileImage){
        this.profileImage = profileImage;
    }
}