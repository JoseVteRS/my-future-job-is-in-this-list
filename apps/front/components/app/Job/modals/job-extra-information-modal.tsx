import React, { useState } from 'react';
import { Field, Formik, useField } from 'formik';
import * as Yup from 'yup';
import AnnotationIcon from '../../../ui/Icons/annotation-icon';
import Modal from '../../../ui/Modal/Modal';
import { gql, useMutation } from '@apollo/client';
import Editor from '@monaco-editor/react';
import { useFormFields } from '../../../../hooks/common/form/useForm';

const job_update_extra = gql`
  mutation job_update_extra($jobId: ID!, $input: String!) {
    job_extra_information_update(jobId: $jobId, input: $input)
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

const JobExtraInformationModal = ({ job }) => {
  const [extraModal, setExtraModal] = useState(false);
  const [fields, handleFieldChange] = useFormFields(job.extraInformation);

  const [jobUpdateMutation] = useMutation(job_update_extra, {
    refetchQueries: [job_list_all],
  });

  const jobUpdateExtraInfo = async (event) => {
    event.preventDefault();

    try {
      const { data } = await jobUpdateMutation({
        variables: {
          jobId: job._id,
          input: fields,
        },
      });
      setExtraModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        state={extraModal}
        setState={setExtraModal}
        showHeader={true}
        title="Extra Información de la oferta"
        stylesHeader="p-4 bg-gray-200"
        stylesComponent="overflow-hidden rounded-lg"
      >
        <div className="p-4">
          <p className="font-medium text-gray-500">
            Añadir o modificar las anotaciones de la oferta
          </p>

          <form onSubmit={jobUpdateExtraInfo}>
            <Editor
              height="250px"
              theme="vs-dark"
              language="markdown"
              defaultValue="## Extra información"
              loading="Cargando..."
              onChange={(value) => handleFieldChange(value)}
              value={fields}
            />
            <input
              type="submit"
              className="bg-green-500 rounded w-full  p-2 text-white uppercase font-bold hover:bg-green-600"
              value="Actualizar oferta"
            />
          </form>
        </div>
      </Modal>

      <button onClick={() => setExtraModal(true)}>
        <AnnotationIcon className="h-6 w-6  hover:bg-gray-200 hover:shadow-md p-1 rounded" />
      </button>
    </>
  );
};

const schemaValidation = () => {
  return Yup.object({
    extraInformation: Yup.string().required('Es requerido'),
  });
};

export default JobExtraInformationModal;
