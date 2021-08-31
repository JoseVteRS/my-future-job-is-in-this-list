import React, { useState } from 'react';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { getUrl } from 'apps/front/next-shared/getUrl';
import Badge from '@frontComponents/ui/Badges/Badge';
import DeleteButton from '@frontComponents/ui/Buttons/delete-button';
import TrashIcon from '@frontComponents/ui/Icons/trash-icon';
import Modal from '@frontComponents/ui/Modal/Modal';

const job_delete = gql`
  mutation job_delete($jobId: ID!) {
    job_delete(jobId: $jobId)
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

const JobDeleteModal = ({ job }) => {
  const [stateDeleteModal, setStateDeleteModal] = useState(false);
  const [jobDeleteMutation] = useMutation(job_delete, {
    refetchQueries: [job_list_all],
  });

  const jobDelete = async () => {
    try {
      const { data } = await jobDeleteMutation({
        variables: {
          jobId: job._id,
        },
      });
      setStateDeleteModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        state={stateDeleteModal}
        setState={setStateDeleteModal}
        title="Eliminar oferta"
        showHeader={true}
        stylesComponent="p-0 rounded overflow-hidden"
        stylesHeader="p-4 bg-gray-200"
      >
        <div>
          <div className="p-8 space-y-4">
            <p className="text-xl">
              Esta oferta de trabajo se eliminará permanentemente.
            </p>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <p className="font-bold border-b mb-3">
                Información de la oferta
              </p>
              <div>
                <p>
                  <Badge status={job.status} />
                </p>
                <p className="font-medium">{job.title}</p>
                <p>
                  <Link href={job.url}>
                    <a target='_blank' rel='noreferrer noopener' className="text-blue-600 hover:underline capitalize">
                      {getUrl(job.url, false)}
                    </a>
                  </Link>
                </p>
              </div>
            </div>
            <p className="text-xl font-medium">
              ¿Queire eliminarla igualmente?
            </p>
          </div>

          <div className="flex justify-end items-center space-x-2 p-4 border-t border-t-1">
            <button
              onClick={jobDelete}
              className="bg-red-500 hover:bg-red-600 text-gray-50 px-2 py-1 rounded font-medium"
            >
              Eliminar
            </button>
            <button
              onClick={() => setStateDeleteModal(false)}
              className="text-gray-800 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      <DeleteButton
        onClick={() => setStateDeleteModal(true)}
        textButton={
          <TrashIcon className="h-6 w-6  hover:bg-gray-200 hover:shadow-md p-1 rounded" />
        }
      />
    </>
  );
};

export default JobDeleteModal;
