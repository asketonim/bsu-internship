import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NameServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("name");
        response.getOutputStream().println("<h1 style='color:skyblue'> Name is " + name + "! </h1>");
    }
}
