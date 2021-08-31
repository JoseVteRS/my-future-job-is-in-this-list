import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { jobStatusMapper } from 'apps/front/next-shared/job-status-mapper';

const job_update = gql`
  mutation job_update($jobId: ID!, $input: JobUpdateInput!) {
    job_update(jobId: $jobId, input: $input)
  }
`;

const job_list_all = gql`
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

const JobUpdateForm = ({ job, setState }) => {
  console.log('task from update form', job);

  const [jobUpdateMutation] = useMutation(job_update, {
    refetchQueries: [job_list_all],
  });

  const jobUpdate = async (data) => {
    const { title, description, extraInformation, url } = data;
    try {
      const { data } = await jobUpdateMutation({
        variables: {
          taskId: job._id,
          input: {
            title,
            description,
            extraInformation,
            url,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schemaValidation()}
        enableReinitialize
        initialValues={{
          title: job.title,
          description: job.description,
          extraInformation: job.extraInformation,
          status: job.status,
          url: job.url
        }}
        onSubmit={(data) => {
          jobUpdate(data);
          setState(false);
        }}
      >
        {(props) => {
          // console.log(props);
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="my-4">
                <label htmlFor="title" className="font-medium">
                  Título
                  <input
                    type="text"
                    id="title"
                    className="border rounded shadow bg-white w-full p-2 text-gray-800 text-md"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.title}
                  />
                  {props.touched.title && props.errors.title ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.title}</p>
                    </div>
                  ) : null}
                </label>
              </div>
              <div className="my-4">
                <label htmlFor="url" className="font-medium">
                  URL de la oferta
                  <input
                    type="text"
                    id="url"
                    className="border rounded shadow bg-white w-full p-2 text-gray-800 text-md"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.url}
                  />
                  {props.touched.description && props.errors.description ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.description}</p>
                    </div>
                  ) : null}
                </label>
              </div>
              <div className="my-4">
                <label htmlFor="status" className="font-medium">
                  Estado de la oferta
                  <select
                    name="status"
                    id="status"
                    className="border rounded shadow bg-white w-full p-2 text-gray-800 text-md"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.status}
                  >
                    {Object.values(jobStatusMapper).map((value) => (
                      <option value={value.key}>{value.name}</option>
                    ))}
                  </select>
                  {props.touched.status && props.errors.status ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.status}</p>
                    </div>
                  ) : null}
                </label>
              </div>
              <div className="my-4">
                <label htmlFor="description" className="font-medium">
                  Descripción
                  <textarea
                    rows={10}
                    id="description"
                    className="resize-none border rounded shadow bg-white w-full p-2 text-gray-800 text-md"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                  ></textarea>
                  {props.touched.description && props.errors.description ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.description}</p>
                    </div>
                  ) : null}
                </label>
              </div>
              <input
                type="submit"
                className="bg-green-500 rounded w-full  p-2 text-white uppercase font-bold hover:bg-green-600"
                value="Actualizar oferta"
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

const schemaValidation = () => {
    return Yup.object({
      title: Yup.string().required('El title del cliente es obligatorio'),
      description: Yup.string(),
      url: Yup.string().url('No tiene formato URL'),
      status: Yup.string(),
      extraInformation: Yup.string(),
    });
  };

export default JobUpdateForm;
