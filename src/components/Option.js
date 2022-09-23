import React from 'react'

function Option(props) {
    const { data } = props
    return (
        <div>

           
                <option value={data.designation}>{data.designation}</option>

            
        </div>
    )
}

export default Option