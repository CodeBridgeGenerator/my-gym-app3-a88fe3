import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userID, setUserID] = useState([])
const [planID, setPlanID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount members
                    client
                        .service("members")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMembersId } })
                        .then((res) => {
                            setUserID(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Members", type: "error", message: error.message || "Failed get members" });
                        });
                }, []);
 useEffect(() => {
                    //on mount membershiplans
                    client
                        .service("membershiplans")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleMembershiplansId } })
                        .then((res) => {
                            setPlanID(res.data.map((e) => { return { name: e['planName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Membershiplans", type: "error", message: error.message || "Failed get membershiplans" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            userID: _entity?.userID?._id,
amount: _entity?.amount,
paymentDate: _entity?.paymentDate,
planID: _entity?.planID?._id,
        };

        setLoading(true);
        try {
            
        await client.service("payments").patch(_entity._id, _data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "userID",
                    service : "members",
                    select:["name"]},{
                    path : "planID",
                    service : "membershiplans",
                    select:["planName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info payments updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const userIDOptions = userID.map((elem) => ({ name: elem.name, value: elem.value }));
const planIDOptions = planID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userID">User ID:</label>
                <Dropdown id="userID" value={_entity?.userID?._id} optionLabel="name" optionValue="value" options={userIDOptions} onChange={(e) => setValByKey("userID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userID"]) && (
              <p className="m-0" key="error-userID">
                {error["userID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Amount:</label>
                <InputText id="amount" className="w-full mb-3 p-inputtext-sm" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) && (
              <p className="m-0" key="error-amount">
                {error["amount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentDate">PaymentDate:</label>
                undefined
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentDate"]) && (
              <p className="m-0" key="error-paymentDate">
                {error["paymentDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="planID">PlanID:</label>
                <Dropdown id="planID" value={_entity?.planID?._id} optionLabel="name" optionValue="value" options={planIDOptions} onChange={(e) => setValByKey("planID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["planID"]) && (
              <p className="m-0" key="error-planID">
                {error["planID"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
