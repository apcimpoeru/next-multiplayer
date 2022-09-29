export default function formSelect(props){

    const options = [
        {
            label: "Rock Paper Scissors",
            slug: 'rps'
        },
        {
            label: "Rock Paper Scissors Lizard Spock",
            slug: 'rpsls'
        }
    ];

    const optionsHtml = options.map(function(el, index){
        return <option key={index} value={el.slug}>{el.label}</option>
    })

    return <select className="input w-full mt-2" name={props.name}>
        {optionsHtml}
    </select>

}