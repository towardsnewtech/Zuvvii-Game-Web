import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Radio } from '@mui/material';
import * as React from 'react'
import { IModal } from './types';
import { StyledButton, StyledPaper, StyledTextField } from 'shared/styled'
import tagStyled from 'styled-components'

const ReportModal = ({
    open,
    handleClose
}: IModal) => {
    const reportList = [
        {
            label: "Bullying",
            value: 'bully'
        },
        {
            label: "Scam or fraud",
            value: 'scam'
        },
        {
            label: "Hate Speech or symbol",
            value: 'bully'
        },
        {
            label: "Suicide, self harm, disordered eating",
            value: 'bully'
        },
        {
            label: "It's Spam",
            value: 'bully'
        },
        {
            label: "Voilence Or Dangerous Organization",
            value: 'bully'
        },
        {
            label: "False Information",
            value: 'bully'
        },
        {
            label: "Non-gaming related",
            value: 'bully'
        },
        {
            label: "Animal abuse",
            value: 'bully'
        },
        {
            label: "Non game nudity",
            value: 'bully'
        },
    ]

    const [selectedOption, setSelectedOption] = React.useState(0);
    const [step, setStep] = React.useState(0);

    const onChangeStep = () => {
        if(step == 1) {
            onCloseModal()
            return;
        }
        setStep(step+1)
    }

    const onCloseModal = () => {
        handleClose()
        setSelectedOption(0)
        setStep(0)
    }

    return (
        <Dialog
            open={open}
            onClose={onCloseModal}
            fullWidth
            PaperComponent={StyledPaper}
        >
            <DialogTitle>
                Report Clip
            </DialogTitle>
            <Divider />
            <DialogContent>
                {
                    step == 0 && <React.Fragment>
                        <SubTitle>Why are you reporting this clip?</SubTitle>
                        <ReportList>
                        {
                            reportList.map((item, index) => (
                                <ReportItem
                                    key={index}
                                >
                                    { item.label }
                                    <Radio
                                        name="report_option"
                                        color="primary"
                                        checked={index == selectedOption}
                                        onChange={() => setSelectedOption(index) }
                                    />
                                </ReportItem>
                            ))
                        }
                        </ReportList>
                    </React.Fragment>
                }
                {
                    step == 1 && <React.Fragment>
                        <StyledTextField 
                            multiline
                            rows={5}
                            fullWidth
                            placeholder='Send more information(optional)'
                        />
                    </React.Fragment>
                }
            </DialogContent>
            <DialogActions>
                <StyledButton fullWidth onClick={onChangeStep}>{step == 0 ? "Next" : "Send Report"}</StyledButton>
            </DialogActions>
        </Dialog>
    )
}

export default ReportModal;

const SubTitle = tagStyled.p`
    margin: 0px;
    padding: 0px;
    font-weight: 500;
    font-size: 1.25rem;
    padding-bottom: 1.5rem;
`
const ReportList = tagStyled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`
const ReportItem = tagStyled.div`
    display: flex;
    justify-content: space-between;f
`