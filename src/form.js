import { useState } from "react";
const validation = (key, value) => {
    switch (key) {
        case "uname":
            if (!value) {
                return ("enter username")
            }
            else {
                return ""
            }
        case "email":
            if (!value) {
                return ("enter email")
            }
            else {
                return ""
            }
        case "psw":
            if (!value) {
                return ("enter password")
            }
            else {
                return ""
            }
    }
};
export default function Form() {
    const [info, setInfo] = useState({
        uname: "",
        email: "",
        psw: "",
    });
    const [isEdit, setIsEdit] = useState(-1);
    const [isadd, setIsadd] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || []);
    const deleteRecord = (index) => {
        data.splice(index, 1);
        setData([...data]);
    };
    const [iseditall, setIseditall] = useState(false);
    const [issaved, setIssaved] = useState(false);
    const [saveddata, setSaveddata] = useState(
        JSON.parse(localStorage.getItem("saveddata")) || []
    );
    const [error, setError] = useState({
        uname: "",
        pswd: "",
        email: ""
    });
    const [duplicate, setDuplicate] = useState(JSON.parse(localStorage.getItem("data")));
    const handleSubmit = () => {
        if (isEdit === -1) {
            const info = info;
            setData([...data, info]);
            setDuplicate([...data, info]);
            localStorage.setItem("data", JSON.stringify([...data, info]))
        }
        clearState();
    };
    const clearState = () => {
        setInfo({
            uname: "",
            pswd: "",
            email: ""
        });
    };
    const handleOnchange = (e) => {
        const value = e.target.value;
        setInfo({ ...info, [e.target.name]: value });
    };
    const editalll = () => {
        setIseditall(true);
    };
    const inputChange = (e, index) => {
        const update = data.map((item, idx) => {
            if (idx === index) {
                return { ...item, [e.target.name]: e.target.value };
            }
            return item;
        });
        setSaveddata(update);
        localStorage.setItem("saveddata", JSON.stringify(saveddata));
        setData(update);
    };
    const saveall = () => {
        const updateddata = saveddata.map((item) => {
            const errors = {}
            Object.keys(item).forEach((key) => {
                const err = validation(key, item[key])
                if (err) {
                    return errors[key] = err
                }
            })
            item.errors = errors;
            return item
        })
        setSaveddata(updateddata);
        setData(saveddata)
        if (updateddata.some(values => Object.keys(values.errors).length)) {
            return
        } else {
            localStorage.setItem("data", JSON.stringify(saveddata));
            setData(saveddata);
            setIseditall(false);
        }
    };
    return (
        <>
            <h1>Form</h1>

            <label htmlFor="uname">Username </label>
            <input type="text" id="uname" value={info.uname} onChange={handleOnchange} name="uname" /><br /><br />
            <label htmlFor="email" > Email</label>
            <input type="email" id="email" name="email" value={info.email} onChange={handleOnchange} /><br /><br />
            <label htmlFor="psw">Password</label>
            <input type="password" id="paw" name="psw" value={info.psw} onChange={handleOnchange} /><br /><br />
            <button className="submit" onClick={handleSubmit}> Submit</button>


            <div >
                <h1>Table</h1>
                {iseditall ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>password</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td><input type="text" name="uname" onChange={(e) => inputChange(e, index)} value={item.uname} /></td>
                                    <td><input name="email" type="text" onChange={(e) => inputChange(e, index)} value={item.email} /></td>
                                    <td><input name="psw" type="text" onChange={(e) => inputChange(e, index)} value={item.psw} /></td>
                                    <td><button type="button" className="delete" onClick={deleteRecord}> delete</button></td>
                                    <td><button type="button" className="editall" onClick={editalll}>EditAll</button></td>
                                    <td><button type="button" className="save" onClick={saveall}>Save</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (isadd ? (<table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>password</th>
                            <th>Button</th>
                        </tr>
                        <tr>
                            <td><input type="text" name='uname' /></td>
                            <td><input type="text" name='email' /></td>
                            <td><input type="text" name='psw' /></td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...data].map((item, index) => (
                            <tr key={index}>
                                <td>{item.uname}</td>
                                <td>{item.email}</td>
                                <td>{item.pswd}</td>
                                <td><button className="delete" onClick={deleteRecord}>delete</button></td>
                                <td><button type="button" className="editall" onClick={editalll}>EditAll</button></td>
                                <td><button type="button" className="save" onClick={saveall}>Save</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
                    : (<table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>password</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...data].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.uname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.psw}</td>
                                    <td><button className="delete" onClick={deleteRecord}>delete</button></td>
                                    <td><button type="button" className="editall" onClick={editalll}>EditAll</button></td>
                                    <td><button type="button" className="save" onClick={saveall}>Save</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)
                )}
            </div>
        </>
    );
}