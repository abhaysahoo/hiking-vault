import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { Label } from "@/components/ui/label"

const InternationalPhoneInput = ({ setBusinessInfo, businessInfo }) => {
    return (
        <>
            <Label className='label' htmlFor="phone">Phone </Label>
            <PhoneInput
                country={'us'}  // Default country
                value={businessInfo.phone}
                id="phone"
                onChange={(e) => setBusinessInfo({...businessInfo, phone: e})}
                enableSearch={true}  // Enable country search
                inputClass='phone_input'
                containerClass='phone_container'
            />
        </>
    )
}

export default InternationalPhoneInput