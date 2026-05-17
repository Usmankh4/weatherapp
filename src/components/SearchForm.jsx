import { useState } from "react";

export default function SearchForm(props){

    const [cityInput, setCityInput] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        props.onSearch(cityInput)
        setCityInput("");
    }


    return (
        <div>
          
            <form onSubmit={handleSubmit}> 
            <input type="text" placeholder="Search City" 
            value={cityInput} 
            onChange={(event) => setCityInput(event.target.value)}
            >
            </input>
            <button type="submit"> Submit</button>
            </form>
            </div>
      
    )
}