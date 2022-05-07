import React from 'react';
import Details from "./Details";

export default function List(props) {

    const [data, setData] = React.useState([]);
    const [info, setInfo] = React.useState(null);

    // Считываем данные
    React.useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
//            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        fetch(process.env.REACT_APP_DATA_URL, requestOptions)
            .then(response => {
                console.log('Load data - RESPONSE', response);
                console.log('Load data - RESPONSE status = ' + response.status);
//                console.log('Load data - RESPONSE json = ' + response.json());
                return response.json();
            })
            .then(
                (data) => {
                    console.log('Load data - OK', data);
                    setData(data);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.log('Load data - ERROR', error);
                }
            );

        // return () => {
        //     console.log(`clear intervalId ${intervalId}`);
        //     clearInterval(intervalId);
        // }
    }, []);      // deps = [] - функция выполнится один раз  (если undefined, то при каждой перерисовки)


    const onClick = (id) => {
//        console.log('onClick id = ' + id + '    info = ' + JSON.stringify(info));

        if ((info == null) || (id != info.id))
        {
            let new_data = data.filter(item => item.id == id)[0];

//            console.log('call setInfo  new_data = ' + JSON.stringify(new_data));

            setInfo(new_data);
        }
    }

    return (
        <div id="container">
            <div id="list">
                {data.map(item =>
                    <div
                        key={item.id}
                        className="list_item"
                        onClick={evt => onClick(item.id)}>{item.name}
                    </div>
                )}
            </div>
            <Details info={info} />
        </div>
    );
}
