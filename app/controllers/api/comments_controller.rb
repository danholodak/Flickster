class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(strong_params)
        if @comment.save
        render json: "success"
        else
        render json: @comment.errors.full_messages, status: 422
        end
    end

    # def show
    #     @comment = Comment.find_by(id: params[:id])
    #     if @comment
    #         render :show
    #     end
    # end

    def index
        @comments = Comment.where(photo_id: params[:photo_id])
        render :index
    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment
            @comment.update(strong_params)
            if @comment.save
                render :show
            else
                render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
            end
        end

    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        if @comment.destroy
            render json: "success"
        end

    end

    private

    def strong_params
        params.require(:comment).permit(:id, :author_id, :photo_id, :body)
    end

end