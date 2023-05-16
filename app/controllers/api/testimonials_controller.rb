class Api::TestimonialsController < ApplicationController

    def create
        @testimonial = Testimonial.new(strong_params)
        if @testimonial.save
        render json: "success"
        else
        render json: @testimonial.errors.full_messages, status: 422
        end
    end

    # def show
    #     @testimonial = Testimonial.find_by(id: params[:id])
    #     if @testimonial
    #         render :show
    #     end
    # end

    def index
        @testimonials = Testimonial.where(subject_id: params[:subject_id])
        render :index
    end

    def update
        @testimonial = Testimonial.find_by(id: params[:id])
        if @testimonial
            @testimonial.update(strong_params)
            if @testimonial.save
                render :show
            else
                render json: {errors: @testimonial.errors.full_messages}, status: :unprocessable_entity
            end
        end

    end

    def destroy
        @testimonial = Testimonial.find_by(id: params[:id])
        if @testimonial.destroy
            render json: "success"
        end

    end

    private

    def strong_params
        params.require(:testimonial).permit(:id, :author_id, :photo_id, :body)
    end

end