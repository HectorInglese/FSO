const Statistics = (statistics) => {

    const { good, neutral, bad } = statistics.statistics;
    const total = good + neutral + bad;
    return (
        <>
            {
                total <= 0
                    ? (<p>No feedback given</p>)
                    : (
                        <table>
                            <th>FEEDBACK</th>
                            <tr>
                                <td>good</td>
                                <td>{good}</td>
                            </tr>
                            <tr>
                                <td>Neutral</td>
                                <td>{neutral}</td>
                            </tr>
                            <tr>
                                <td>Bad</td>
                                <td>{bad}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{total}</td>
                            </tr>
                        </table>
                    )
            }
        </>
    );
};
export default Statistics;