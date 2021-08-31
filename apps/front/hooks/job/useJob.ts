import { gql, useQuery } from '@apollo/client';


export const useJobs = () => {

    const JOB_LIST_ALL = gql`
    query job_list_all {
        job_list_all {
        _id
        title
        description
        status
        extraInformation
        url
        }
    }
    `;

    const { data, loading, error } = useQuery(JOB_LIST_ALL);

    return {
        JOB_LIST_ALL,
        data,
        loading,
        error
    }


}