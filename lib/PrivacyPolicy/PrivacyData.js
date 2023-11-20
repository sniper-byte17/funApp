export const privacyData =[
    {
        id:1,
        heading:'Overview',
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500st of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },
    {
        id:2,
        heading:'Lorem ipsum text',
        description:'t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingayout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
    },
    {
        id:3,
        heading:'Lorem ipsum text',
        description:'t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingayout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
    },
    {
        id:4,
        heading:'Lorem ipsum text',
        description:'t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingayout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
    },
    {
        id:5,
        heading:'Lorem ipsum text',
        description:'t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingayout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
    },
    {
        id:6,
        heading:'Lorem ipsum text',
        description:'t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to usingayout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'
    }
]

const policyHeadingStyles = {
    fontSize: '2.4rem',
    fontWeight: '700'
}
const policyStyles = {
    fontSize: '2.4rem',
    fontWeight: '700'
}

export const PrivacySingle=({data})=>{
    return(
        <div className="space-y-1">
            <h2 style={policyHeadingStyles}>{data.id}.{data.heading}</h2>
            <p>{data.description}</p>
        </div>
    )
}