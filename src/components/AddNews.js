import React, { useState } from 'react'

function AddNews(props) {
    const [data, setData] = useState({ newsTitle: "", newsDesc: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/view/addNews", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({newsTitle: data.newsTitle, newsDesc: data.newsDesc })
            });
            const json = await response.json()
            if (json.success) {
                setData({ newsTitle: "", newsDesc: "" })
                props.showAlert("News Added successfully!", "success");
            }
            else{
                props.showAlert("Action Could not be completed!! Plz try again", "danger");
            }

        } catch (error) {
            setData({ newsTitle: "", newsDesc: "" })
            props.showAlert("Some Error Ocurred Please Try Again!", "danger");
        }

    }

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form className="" method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">News Topic</label>
                    <input type="text" name="newsTitle" value={data.newsTitle} required className="form-control" id="exampleFormControlInput1" placeholder="Title here.." onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">News Description</label>
                    <textarea className="form-control" required value={data.newsDesc} name='newsDesc' id="exampleFormControlTextarea1" rows="5" onChange={onChange}></textarea>
                </div>
                {/* <div class="mb-3">
                <label for="formFileSm" class="form-label">Small file input example</label>
                <input class="form-control form-control-sm" name="newsFile" id="formFileSm" type="file" />
            </div> */}
                <button type="submit" className="btn btn-success">Add News</button>
            </form>
        </div>
    )
}

export default AddNews