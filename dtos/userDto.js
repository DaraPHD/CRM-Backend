module.exports = class UserDto {
    email;
    id;
    isActivated;
    role;
    avatar;
    name;
    surname;
    position;
    
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.avatar = model.avatar;
        this.name = model.name;
        this.surname = model.surname;
        this.position = model.position

    }
};
