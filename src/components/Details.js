import React from 'react';

export default function Details(props) {

    console.log('Details props.info =' + props.info);

    const [item, setItem] = React.useState(null);

    // Считываем данные
    React.useEffect(() => {

        if (props.info != null)
        {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
    //            body: JSON.stringify({ title: 'React POST Request Example' })
            };

            fetch(process.env.REACT_APP_DATA_URL + '/' + props.info.id, requestOptions)
                .then(response => {
                    console.log('Load data - RESPONSE', response);
                    console.log('Load data - RESPONSE status = ' + response.status);
    //                console.log('Load data - RESPONSE json = ' + response.json());
                    return response.json();
                })
                .then(
                    (data) => {
                        console.log('Load data - OK', data);
                        setItem(data);
                    },
                    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                    // чтобы не перехватывать исключения из ошибок в самих компонентах.
                    (error) => {
                        console.log('Load data - ERROR', error);
                    }
                );
        }

        // return () => {
        //     console.log(`clear intervalId ${intervalId}`);
        //     clearInterval(intervalId);
        // }
    }, [props.info]);      // deps = [] - функция выполнится один раз  (если undefined, то при каждой перерисовки)

    if (item == null)
    {
        return null;
    }
    else
    {
        return (
            <div id="detail">
                <img src={item.avatar}/>
                <div className="detail_item">{item.name}</div>
                <div className="detail_item">{'City: ' + item.details.city}</div>
                <div className="detail_item">{'Company: ' + item.details.company}</div>
                <div className="detail_item">{'Position: ' + item.details.position}</div>
            </div>
        );
    }


/*
    return (
        <div id="detail" className={(item == null) ? 'hidden' : ''}>
            <img src={(item == null) || item.avatar}/>
            <div className="detail_item">{(item == null) || item.name}</div>
            <div className="detail_item">{(item == null) || 'City: ' + item.details.city}</div>
            <div className="detail_item">{(item == null) || 'Company: ' + item.details.company}</div>
            <div className="detail_item">{(item == null) || 'Position: ' + item.details.position}</div>
        </div>
    );
*/
}