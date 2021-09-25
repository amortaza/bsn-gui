const initialState = {
    numOfCakes: 10,
    
    recs : [
        {Table: "User", Field: "First Name", Type: "String" },
        {Table: "User", Field: "Last Name", Type: "String" },
        {Table: "User", Field: "Phone", Type: "String" },
        {Table: "User", Field: "Active", Type: "True/False" },
    ],

    headers : ['Table', 'Field', 'Type']
}

export default initialState