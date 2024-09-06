import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import Image from "next/image";

const TextCopyComponent = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000); // Display for 1 seconds
    };

    return (
        <div className="relative">
            <CopyToClipboard
                text={text}
                onCopy={handleCopy}
            >
                <button className="hover:bg-brand-200 p-2 rounded-full ml-2">
                    <Image
                        src={copied ? '/icons/tick.svg' : '/icons/duplicate.svg'}
                        alt="duplicate icon"
                        width={12}
                        height={12}
                        className=""
                    />
                </button>
            </CopyToClipboard>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full -mt-1 text-xs text-neutral-400 ">{copied && 'copied'}</div>
        </div>
    )
}

export default TextCopyComponent