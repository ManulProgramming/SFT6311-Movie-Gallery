import {useCallback, useState} from "react";

export default function useForm(initialValues = {}) {
    const [form, setForm] = useState(initialValues);

    const handleChange = useCallback((e) => {
        const {name, value} = e.target;
        let regex = /^.+$/;
        let helpBlock;
        let helpBlockInnerText = "Something went wrong.";
        if (name === "date") {
            regex = /^[1-2][0189][0-9][0-9]-[0-1][0-9]-[0-3][0-9]$/;
            helpBlock = document.getElementById("dateHelpBlock");
            helpBlockInnerText = "Date needs to be in YYYY-MM-DD format.";
        } else if (name === "genre") {
            regex = /^[a-zA-Z0-9_, -]+$/;
            helpBlock = document.getElementById("genreHelpBlock");
            helpBlockInnerText = "Genre should be seperated by comma and contain only letters and digits.";
        } else if (name === "rating") {
            regex = /^[0-9]{1,2}\.?[0-9]?$/;
            helpBlock = document.getElementById("ratingHelpBlock");
            helpBlockInnerText = "Rating should be a floating number from 0 to 10 inclusively."
        } else if (name === "poster") {
            regex = /^https?:\/\/[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|ico)(?:\?[^\s#]*)?(?:#[^\s]*)?$/;
            helpBlock = document.getElementById("posterHelpBlock");
            helpBlockInnerText = "Poster link is not valid."
        }
        let isValid = regex.test(value);
        if (isValid) {
            try {
                e.target.classList.add('is-valid');
                e.target.classList.remove('is-invalid');
                if (helpBlock) {
                    helpBlock.classList.add('text-muted');
                    helpBlock.classList.remove('text-danger');
                    helpBlock.innerText = "";
                }
            }catch{
                null;
            }
        } else {
            try {
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
                if (helpBlock) {
                    helpBlock.classList.remove('text-muted');
                    helpBlock.classList.add('text-danger');
                    helpBlock.innerText = helpBlockInnerText;
                }
            }catch{
                null;
            }
        }
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    },[]);

    const reset = () => {
        setForm(initialValues);
    };

    return {
        form,
        setForm,
        handleChange,
        reset
    };
}