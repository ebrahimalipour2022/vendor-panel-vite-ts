import type { FC, ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '@/layouts/materialize-layout/@core/components/mui/Avatar';
import UploadCameraIcon from '@/layouts/materialize-layout/@core/svg/UploadCamera';

interface AvatarUploaderProps {
  // Optional prop to specify initial avatar
  initialAvatar?: string;
  handleClose: () => void;
}

///images/avatars/2.png
const AvatarUploader: FC<AvatarUploaderProps> = ({ initialAvatar = '', handleClose }) => {
  const { t } = useTranslation();

  const [avatar, setAvatar] = useState<{ isNew: boolean; file: string | null }>({
    isNew: false,
    file: initialAvatar,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatar({
          isNew: true,
          file: e?.target?.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputReset = () => {
    if (fileInputRef?.current) {
      setAvatar({ isNew: false, file: '' });
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {};

  return (
    <Stack>
      <div className="flex flex-col items-center gap-6">
        {avatar?.file ? (
          <CustomAvatar src={avatar.file} alt="Avatar" size={183} className="rounded-full" />
        ) : (
          <CustomAvatar alt="Avatar" size={183} className="rounded-full" />
        )}

        <div className="flex flex-grow flex-col gap-4 w-full">
          <div className="flex  gap-4 w-full">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="flex  gap-4 w-full">
              <Button
                variant="contained"
                fullWidth
                size={'large'}
                className={'w-[calc(100% - 94px)]'}
                startIcon={<UploadCameraIcon />}
                onClick={() => (!avatar?.isNew ? handleClick() : handleSave())}
              >
                {!avatar?.isNew ? t('profile.avatar.newUpload') : t('profile.avatar.saveImage')}
              </Button>
              <Button
                variant="outlined"
                size={'large'}
                color="error"
                className={'w-[94px]'}
                onClick={() => (!avatar?.isNew ? handleFileInputReset() : handleClose())}
              >
                {!avatar?.isNew ? t('common.remove') : t('common.cancel')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default AvatarUploader;
