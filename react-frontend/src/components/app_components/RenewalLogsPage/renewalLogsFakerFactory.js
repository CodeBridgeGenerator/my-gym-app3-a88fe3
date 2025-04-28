
import { faker } from "@faker-js/faker";
export default (user,count,userIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userID: userIDIds[i % userIDIds.length],
renewalDate: faker.date.past(""),
previousendDate: faker.date.past(""),
newendDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
