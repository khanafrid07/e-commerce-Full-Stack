import { Container, Truck, PackageOpen, PackageCheck   } from 'lucide-react';

export default function DeliverySteps({activeStatus}) {

    return (
        <div>
            <div>
                <ul className="steps">
                    <li className="step step-neutral">
                        <span className="step-icon bg-gray-300"><Container className='animate-spinSlow'/></span>
                    </li>
                    <li className={`step ${activeStatus==="Arrived"?"step-neutral":""}`}>
                        <span className="step-icon"><Truck/></span>
                    </li>
                    
                    <li className={`step ${activeStatus==="Arrived"?"step-neutral":""}`}>
                        <span className="step-icon"><PackageOpen/></span>
                    </li>
                    <li className={`step ${activeStatus==="Delivered"?"step-neutral":""}`}>
                        <span className="step-icon"><PackageCheck/></span>
                    </li>
                   
                </ul>
            </div>
        </div>
    )
}