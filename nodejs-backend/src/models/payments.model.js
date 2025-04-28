
    module.exports = function (app) {
        const modelName = 'payments';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userID: { type: Schema.Types.ObjectId, ref: "members" },
amount: { type:  String , required: true },
paymentDate: { type: Date, required: false },
planID: { type: Schema.Types.ObjectId, ref: "membershiplans" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };