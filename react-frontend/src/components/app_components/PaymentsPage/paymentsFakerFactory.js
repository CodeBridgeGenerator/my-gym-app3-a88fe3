
import { faker } from "@faker-js/faker";
export default (user,count,userIDIds,planIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userID: userIDIds[i % userIDIds.length],
amount: faker.lorem.sentence(1),
paymentDate: faker.lorem.sentence(1),
planID: planIDIds[i % planIDIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
