import type { SVGAttributes } from 'react'

const AuthBackground = (props: SVGAttributes<SVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%" viewBox='0 0 924 505' fill='none' {...props}>
    <g clipPath='url(#a)'>
      <g filter='url(#b)' opacity={0.5}>
        <path
          fill='#D4B1FF'
          d='M362.602 888.52c86.945 20.958 42.44 118.62 113.72 144.14 71.28 25.52 139.486 85.06 241.574 83.24 119.391-2.13 187.029-80.77 266.676-124.498 79.648-43.728-60.127-133.6-41.229-284.478 18.897-150.878 6.093-267.777-119.286-251.483-101.682 13.215-24.115 193.19-127.022 192.109-93.713-.985-55.314-129.317-140.461-161.898-119.861-45.863-216.488 9.154-319.133 92.202C134.797 660.902 25.436 727.118 85.918 821.823c52.786 82.654 189.739 45.738 276.684 66.697Z'
        />
      </g>
      <g filter='url(#c)' opacity={0.5}>
        <path
          fill='#B1F1FF'
          d='M-34.146 492.087c-44.611 65.533-146.562 7.848-192.735 59.716-46.172 51.869-130.795 93.676-152.748 176.51-25.674 96.872 48.933 168.999 80.516 243.047 31.582 74.05 167.978-18.791 337.233 30.07 169.255 48.86 306.859 64.56 317.634-40.299 8.739-85.043-216.74-62.5-191.253-145.347 23.21-75.446 161.914-15.859 219.483-77.351 81.038-86.563 40.459-176.835-30.974-278.208-71.434-101.374-121.906-204.422-245.189-176.681C.226 307.754 10.466 426.554-34.146 492.087Z'
        />
      </g>
      <path
        stroke='#fff'
        strokeDasharray='5.7 5.7'
        strokeWidth={2.848}
        d='M-134.686 69.263S16.677 213.815 155.789 204.212C290.278 194.929 467.753 88.439 601.753 75.36 785.461 57.429 924 271 924 271'
      />
      <path
        stroke='#fff'
        strokeWidth={2.848}
        d='M-142.754 122.257s153.871 148.91 293.621 140.765c135.105-7.874 312.289-114.191 446.858-125.935C782.213 120.986 924 340 924 340'
      />
      <path
        stroke='#fff'
        strokeWidth={2.848}
        d='M-121.002 14.56S28.433 157.313 165.739 147.868C298.48 138.737 473.626 33.644 605.884 20.765 787.205 3.107 924 214 924 214'
      />
      <g filter='url(#d)' opacity={0.5}>
        <path
          fill='#FFDB70'
          fillOpacity={0.54}
          d='M311.714 475.961c71.775 17.302 35.035 97.922 93.879 118.989 58.843 21.068 115.149 70.224 199.426 68.721 98.56-1.757 154.397-66.678 220.148-102.777 65.75-36.099-49.637-110.291-34.036-234.845 15.6-124.554 5.03-221.057-98.474-207.606-83.941 10.909-19.908 159.484-104.86 158.591-77.362-.813-45.663-106.755-115.954-133.651-98.949-37.861-178.717 7.557-263.453 76.115C123.655 288.057 33.374 342.72 83.304 420.902c43.575 68.233 156.634 37.757 228.41 55.059Z'
        />
      </g>
    </g>
    <defs>
      <filter
        id='b'
        width={1132.72}
        height={854.02}
        x={-27.403}
        y={357.922}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
        <feGaussianBlur result='effect1_foregroundBlur_276_2742' stdDeviation={48} />
      </filter>
      <filter
        id='c'
        width={1053.6}
        height={1000.34}
        x={-504.91}
        y={158.959}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
        <feGaussianBlur result='effect1_foregroundBlur_276_2742' stdDeviation={60} />
      </filter>
      <filter
        id='d'
        width={1096.59}
        height={866.516}
        x={-90.996}
        y={-42.81}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
        <feGaussianBlur result='effect1_foregroundBlur_276_2742' stdDeviation={80} />
      </filter>
      <clipPath id='a'>
        <path fill='#fff' d='M0 0h924v505H0z' />
      </clipPath>
    </defs>
  </svg>
)

export default AuthBackground
