import React, { useState } from 'react';
import EditButton from '../../../ui/Buttons/edit-button';
import PencilIcon from '../../../ui/Icons/pencil-icon';
import Modal from '../../../ui/Modal/Modal';
import JobUpdateForm from '../job-update-form';

const JobUpdateModal = ({ job }) => {
  const [stateUpdateModal, setStateUpdateModal] = useState(false);

  return (
    <>
      <Modal
        state={stateUpdateModal}
        setState={setStateUpdateModal}
        title="Actualizar oferta"
        showHeader={true}
        stylesHeader="bg-gray-200 p-4"
        stylesComponent="p-0 overflow-hidden rounded-lg"
      >
        <div className='p-4'>
          <JobUpdateForm setState={setStateUpdateModal} job={job} />
        </div>
      </Modal>

      <EditButton
        onClick={() => setStateUpdateModal(true)}
        textButton={
          <PencilIcon className="h-6 w-6  hover:bg-gray-200 hover:shadow-md p-1 rounded" />
        }
      />
    </>
  );
};

export default JobUpdateModal;
