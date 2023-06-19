class Api::AlbumEntriesController < ApplicationController

    def create
        @album = AlbumEntry.new(strong_params)
        if @album.save
        render json: "success"
        else
        render json: @album.errors.full_messages, status: 422
        end
    end

    def destroy
        @album = Album_Entry.find_by(user_id: params[:favorite][:user_id], photo_id: params[:favorite][:photo_id])
        if @album.destroy
            render json: "success"
        end

    end

    private

    def strong_params
        params.require(:album_entry).permit(:user_id, :photo_id)
    end

end