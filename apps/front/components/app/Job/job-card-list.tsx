import React from 'react';
import { useJobs } from '../../../hooks/job/useJob';
import JobCard from './job-card';

const JobCardList = () => {
    const {data, loading, error} = useJobs();
    if(loading) return (<p>Cargando...</p>)
    return (
        <div>
            {
                data.job_list_all.map((job) => (
                    <>
                        <JobCard job={job} />
                    </>
                ))
            }
        </div>
    )
}

export default JobCardList
