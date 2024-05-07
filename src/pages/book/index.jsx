import { useLocation } from "react-router-dom"
import ViewDetail from "./ViewDetail";
import BookLoader from "./BookLoader";
import { getDetailBookById } from "../../services/api";
import { useEffect, useState } from "react";


const BookPage = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get('id');
    const [isLoading, setIsLoading] = useState(false);
    const [dataBook, setDataBook] = useState({});

    console.log('check book id: ', id);

    const fetchBookById = async (id) => {
        setIsLoading(true);
        const res = await getDetailBookById(id);
        console.log(res)
        if (res && res.data) {
            setTimeout(() => {
                setDataBook(res.data);
                setIsLoading(false)
            }, 1000)

        }
        else {
            setDataBook({})
        }

    }

    useEffect(() => {
        fetchBookById(id);

    }, [])
    return (
        <>
            {isLoading ?
                <BookLoader />
                :
                <ViewDetail
                    dataBook={dataBook}
                />

            }
        </>
    )
}

export default BookPage
