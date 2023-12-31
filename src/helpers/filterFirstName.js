const filterFirstName = (fullname) => {

    const regex = /(\S+)/g;
    const matches = fullname.match(regex);

    return matches[0];

}

export default filterFirstName;