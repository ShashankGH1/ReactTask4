import Axios from "axios";
import React,{useEffect,useState} from "react";
function C1(){
    const[data,setData]=useState([]);
    useEffect(()=>{
        Axios.get("https://dummyjson.com/users")
        .then((res)=>{
            if(res.status===200){
                setData(res.data);
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>alert(err));
    },[])
    const List = () => {
        if(!Array.isArray(data.users)) {
            return <p>No user data available.</p>;
        }

        const getUserKeys = () =>{
            if (data.users.length === 0) return [];
            return Object.keys(data.users[0]);
        };

        const userKeys = getUserKeys();
        
        const renderData = (value) => {
            if (typeof value === "object") {
                // If the value is an object, recursively render its keys and values
                return (
                    <ul>
                    {Object.entries(value).map(([key, val]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {renderData(val)}
                        </li>
                    ))}
                    </ul>
                );
            } else {
                // Otherwise, display the value
                return value;
            }
        };
        
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            {
                                userKeys.map((item,index)=>(
                                    <th key={index}>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map((user, userIndex) => (
                            <tr key={userIndex}>
                                {Object.entries(user).map(([key, value]) => (
                                    <td key={key}>{renderData(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>  
            </div>
        );
    };
    return(
        <div>
            {console.log(data.users)}
            {List()}
        </div>
    )      
}
export default C1;