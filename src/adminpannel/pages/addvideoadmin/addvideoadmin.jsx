export function Addvideoadmin() {
    return (
        <div className="w-50 mt-3">
            <h3>Add new video</h3>
            <form>
                <dl>
                    <dt>Video link</dt>
                    <dd>
                        <input className="form-control" placeholder="enter the link for ifream"></input>
                    </dd>
                    <dt>Title</dt>
                    <dd>
                        <input className="form-control" placeholder="enter title of video"></input>
                    </dd>
                    <dt>discription</dt>
                    <dd>
                        <input  className="form-control discription"></input>
                    </dd>
                    <dt>thumbnil</dt>
                    <dd>
                        <input type="file" className="form-control thumbnil"></input>
                    </dd>
                </dl>
                <button className="btn btn-success w-100 text-center">add video</button>
            </form>
        </div>
    )
}