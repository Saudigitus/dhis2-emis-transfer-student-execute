import React, { useState } from 'react'
import { IconAddCircle24, Button, ButtonStrip } from "@dhis2/ui";
import ModalComponent from '../../../modal/Modal';
import ModalContentComponent from '../../../modal/ModalContent';
import { useParams } from '../../../../hooks/commons/useQueryParams';
import Tooltip from '@material-ui/core/Tooltip';
import { useRecoilState } from 'recoil';
import { RowSelectionState } from '../../../../schema/tableSelectedRowsSchema';
import useGetSectionTypeLabel from '../../../../hooks/commons/useGetSectionTypeLabel';

function EnrollmentActionsButtons() {
  const [open, setOpen] = useState<boolean>(false);
  const { urlParamiters } = useParams();
  const { school: orgUnit } = urlParamiters();
  const [selected] = useRecoilState(RowSelectionState);
  const { sectionName } = useGetSectionTypeLabel();

  return (
    <div>
      <ButtonStrip>
        <Tooltip title={orgUnit === null ? "Please select an organisation unit before" : ""}>
          <span>
            <Button disabled={orgUnit == null || selected.selectedRows.length === 0} onClick={() => { setOpen(true); }} icon={<IconAddCircle24 />}>Execute transfer</Button>
          </span>
        </Tooltip>
      </ButtonStrip>

      {open && <ModalComponent title={`${sectionName} Transfer`} open={open} setOpen={setOpen}><ModalContentComponent setOpen={setOpen} /></ModalComponent>}
    </div>
  )
}

export default EnrollmentActionsButtons
