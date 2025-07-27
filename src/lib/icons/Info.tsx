import { Icon } from "@/components/ui/icon";

export const Info = (props: React.ComponentProps<typeof Icon>) => (
  <Icon
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    viewBox="0 0 48 48"
  >
    <defs>
      <mask id="ipSInfo0">
        <g fill="none">
          <path
            fill="#fff"
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"
          />
          <path
            fill="#000"
            fillRule="evenodd"
            d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
            clipRule="evenodd"
          />
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M24.5 34V20h-2M21 34h7"
          />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSInfo0)" />
  </Icon>
);

Info.displayName = "Info";
