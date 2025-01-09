import { useState } from 'react';
import LayerPopup from '@/components/common/layerPopup/LayerPopup';
import { covertDateTime } from '@/utils/utils';
import CommentForm from './CommentForm';
import EditAndDelete from '../EditAndDelete';
import { CommentItemProps } from '../types';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { useDeleteCommentMutation } from '@/api/commentApi';
import { toast } from '@/components/common/toast/Toast';

const CommentItem = ({
  comment: { comment_id, user_id, nickname, content, created_at },
}: CommentItemProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showLayerPopup, setShowLayerPopup] = useState<boolean>(false);
  const user = useAppSelector((state: RootState) => state.user.user);
  const [deleteComment] = useDeleteCommentMutation();

  const sendDeleteCommentRequest = () => {
    deleteComment({ comment_id })
      .unwrap()
      .then(() => {
        toast({ message: '댓글이 성공적으로 삭제되었습니다!' });
      })
      .catch(() => {
        toast({
          message: (
            <>
              댓글 삭제에 실패하였습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>
          ),
          type: 'error',
        });
      });
  };

  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-lighterGray last:border-none">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <span className="text-darkerGray text-sm">{nickname}</span>
          {user && user.id === user_id && (
            <EditAndDelete
              onClickEdit={() => setIsEditMode(true)}
              onClickDelete={() => setShowLayerPopup(true)}
              className="text-sm text-darkGray"
            />
          )}
        </div>
        <span className="text-darkGray text-xs">{covertDateTime(created_at)}</span>
      </div>

      {isEditMode && (
        <CommentForm content={content} setShowForm={setIsEditMode} comment_id={comment_id} />
      )}
      {!isEditMode && <p>{content}</p>}

      {showLayerPopup && (
        <LayerPopup
          label={
            <>
              삭제한 댓글은 복구할 수 없습니다.
              <br />
              삭제하시겠습니까?
            </>
          }
          onConfirm={sendDeleteCommentRequest}
          setShowLayerPopup={setShowLayerPopup}
        />
      )}
    </div>
  );
};

export default CommentItem;
